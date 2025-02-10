import { useState, useEffect } from "react";

const useTabBlock = () => {
  const [tabBlocked, setTabBlocked] = useState(false);

  useEffect(() => {
    // Save original window.open method
    const originalWindowOpen = window.open;

    if (tabBlocked) {
      // Intercept window.open and prevent new tabs
      window.open = () => null;
    } else {
      // Restore the original window.open method
      window.open = originalWindowOpen;
    }

    return () => {
      // Clean up: restore the original window.open when the component unmounts
      window.open = originalWindowOpen;
    };
  }, [tabBlocked]);

  return { tabBlocked, setTabBlocked }; // Return as an object
};

const TabBlockComponent = () => {
  const { tabBlocked, setTabBlocked } = useTabBlock(); // Destructure the object

  return (
    <div>
      <h2>{tabBlocked ? "Tabs are blocked" : "Tabs are allowed"}</h2>
      <button onClick={() => setTabBlocked((prev) => !prev)}>
        {tabBlocked ? "Allow Tabs" : "Block Tabs"}
      </button>
    </div>
  );
};

export default TabBlockComponent;
