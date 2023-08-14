import Link from 'next/link'

async function getLectures() {
  const res = await fetch('http://127.0.0.1:1337/api/lectures?populate=*')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getLectures()
  console.log(data)
  return (
  <main>
    {data.data.map((lecture) => (
                            <Link key={lecture.key} href={'/lectures/' + lecture.id}>
                            <div>
                               <h2 className="mb-2 text-xl font-bold leading-snug text-gray-900">
                                  {lecture.attributes.title}
                               </h2>
                               <p>
                               {lecture.attributes.date}
                                </p>
                               <p>
                               {lecture.attributes.capacity}
                                </p>
                             </div>
                             <div className="avatar">
                                      <img
                                        className="flex-shrink-0 object-cover object-center w-12 h-12 rounded-full"
                                        src={`http://localhost:1337${lecture.attributes.mainImage.data.attributes.url}`}
                                        alt={lecture.attributes.title} 
                                       />
                                    </div>
                          </Link>
                                           ))}

  </main>
  )
}