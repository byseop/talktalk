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
 * @returns
 */
export default function queryParams(
  query:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined,
  attr: string
) {
  const params = new URLSearchParams(query);
  return params.get(attr);
}
