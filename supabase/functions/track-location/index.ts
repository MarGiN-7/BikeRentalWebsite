import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LocationData {
  bikeId: string;
  latitude: number;
  longitude: number;
}

// Function to check if point is within polygon
function isPointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  const x = point[0], y = point[1];
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];

    const intersect = ((yi > y) !== (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { bikeId, latitude, longitude }: LocationData = await req.json();

    // Validate coordinates
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      throw new Error('Invalid coordinates');
    }

    // Get geofence boundaries
    const { data: geofences, error: geofenceError } = await supabase
      .from('geofences')
      .select('*');

    if (geofenceError) throw geofenceError;

    // Convert geofence coordinates to format needed for point-in-polygon check
    const geofencePolygon = geofences[0].coordinates.map((point: { x: number; y: number }) => [
      point.x,
      point.y,
    ]) as [number, number][];

    // Check if bike is within geofence
    const isWithinFence = isPointInPolygon([latitude, longitude], geofencePolygon);

    // Store location update
    const { error: locationError } = await supabase
      .from('bike_locations')
      .insert({
        bike_id: bikeId,
        latitude,
        longitude,
        is_within_fence: isWithinFence,
      });

    if (locationError) throw locationError;

    // If bike is outside geofence, send notification
    if (!isWithinFence) {
      // Here you would implement notification logic (SMS, email, etc.)
      console.warn(`Bike ${bikeId} has left the designated area!`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        isWithinFence,
        message: isWithinFence ? 'Location updated' : 'Warning: Bike outside designated area',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});