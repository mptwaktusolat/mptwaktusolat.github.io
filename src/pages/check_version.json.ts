import versions from '../assets/check_version.json';

export function GET() {
  return new Response(JSON.stringify(versions), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
