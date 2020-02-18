/**
 *
 *
 * @export
 * @param {(string
 *     | string[][]
 *     | Record<string, string>
 *     | URLSearchParams
 *     | undefined)} query
 * @param {string} attr
 * @returns {(string | null)}
 */
export default function queryParams (
  query:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined,
  attr: string
): string | null {
  const params = new URLSearchParams(query);
  return params.get(attr);
}
