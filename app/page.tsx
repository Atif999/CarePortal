import Head from "next/head";
import MultiStepForm from "@/components/MultiStepForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>CarePortal MVP</title>
      </Head>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <MultiStepForm />
      </main>
    </>
  );
}
