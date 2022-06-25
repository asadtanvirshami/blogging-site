import React from 'react'

export const user = ({user}) => {
  return (
    <div>
{user.id}

    </div>
  )
}
export default user

export const getStaticProps = async ({ params }) => {
  let request = await fetch(
    `http://localhost:8080/user/userdetail/${params.id}`
  ).then((r) => r.json());
  console.log(request);
  // Pass data to the page via props
  return {
    props: { user: request[0] || null },
  };
};

export async function getStaticPaths() {
  const request = await fetch("http://localhost:8080/user/userdetail").then(
    (r) => r.json()
  );

  console.log(request);
  return {
    paths: request.map((user) => {
      return {
        params: {
          id: user.id,
        },
      };
    }),
    fallback: false,
  };
}
