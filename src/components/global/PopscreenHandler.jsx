import { useContext } from "react";
import { PopscreenContext } from "../../providers/PopscreenProvider";

export default function PopscreenHandler() {
  const { popscreen, setPopscreen } = useContext(PopscreenContext);

  return (
    <>
      {popscreen && popscreen.element ? (
        <section
          className="w-full h-screen fixed left-0 top-0 bg-gray-500/70 p-8 flex justify-center items-center"
          style={{ zIndex: popscreen.zIndex ?? 40 }}
          onClick={() => setPopscreen(undefined)}
        >
          {popscreen.element}
        </section>
      ) : null}
    </>
  );
}
