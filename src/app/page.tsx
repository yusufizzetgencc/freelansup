import Hero from "@/components/home/Hero";
import LoadingScreen from "@/components/ui/LoadingScreen";
import React from "react";

const Page = () => {
  const isLoading = false; // Change this to true to see loading

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <Hero />
        </div>
      )}
    </>
  );
};

export default Page;
