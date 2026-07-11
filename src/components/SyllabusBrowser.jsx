import { getSyllabusMap } from "@/actions/syllabus.action";
import SyllabusBrowserClient from "./SyllabusBrowserClient";

/**
 * SyllabusBrowser — Server Component
 *
 * Fetches the full syllabus map from MongoDB in a single query,
 * then hands the plain-object result to the interactive Client Component.
 * No client-side data fetching needed.
 */
const SyllabusBrowser = async () => {
  // Returns { BTech: { "2015": { S1: url, ... }, ... }, MTech: {...}, PhD: {...} }
  const syllabusMap = await getSyllabusMap();

  // Ensure all three programme keys are present even if DB has no data for them yet
  const normalised = {
    BTech: syllabusMap.BTech ?? {},
    MTech: syllabusMap.MTech ?? {},
    PhD: syllabusMap.PhD ?? {},
  };

  return <SyllabusBrowserClient syllabusMap={normalised} />;
};

export default SyllabusBrowser;
