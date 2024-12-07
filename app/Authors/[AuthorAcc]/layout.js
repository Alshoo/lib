import axios from "axios";

export async function generateMetadata({ params }) {
    
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authors/${params.AuthorAcc}`
    );

    const data = response?.data?.data;

    return {
      title: data?.name || "تفاصيل المؤلف",
      description: data?.biography || "Generated by create next app",
      keywords: data?.keywords?.join(", ") || "",
    };
  } catch (error) {
    console.error("Error fetching metadata", error);

    return {
      title: "تفاصيل المؤلف",
      description: "Generated by create next app",
      keywords: "",
    };
  }
}

export default function AuthorsLayout({ children }) {
  return <div>{children}</div>;
}