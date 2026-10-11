import versions from "../../assets/check_version.json";

/** @deprecated Kept for older app versions. Will be removed somewhere in the future. */
export function GET() {
  return new Response(JSON.stringify(versions.android), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
