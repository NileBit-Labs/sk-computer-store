import { groq } from "next-sanity";
import { client } from "./client";
import { Post } from "../schemaTypes/sanity";

// Using GROQ (Graph-Relational Object Queries)
export async function getPosts(): Promise<Post[]> {
    return await client.fetch(
        groq`*[_type == "post"] {
      _id,
      _createdAt,
      _updatedAt,
      _rev,
      _type,
      title,
      heading,
      description,
      mainImage
    }`
    );
}

export async function getPost(id: string): Promise<Post> {
    return await client.fetch(
        groq`*[_type == "post" && _id == $id][0]`,
        { id }
    );
}