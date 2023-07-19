export default async function ContactList() {
  let people;
  try {
    const response = await fetch(
      "https://communal-gorilla-69.hasura.app/v1/graphql",
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret":
            "uuSuHVcu3qmCFniWZ3nZDLBuWVfd1qjc1mCw2hryrgCCL3F9qk2oHzuHTNnoj0dN",
        },
        body: JSON.stringify({
          query: `query {
            contacts {
                contact_name
                contact_number
                work_location
            }
          }
        `,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    const data = result.data;

    people = data?.contacts;
  } catch (e) {
    console.error("Fetch error:", e);
  }

  console.log(people);

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {people?.map((person) => (
          <li key={person.contact_name} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-white">
                  {person.contact_name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.contact_number}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {person.work_location}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
