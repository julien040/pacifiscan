import urlBuild from "@sanity/image-url";
import client from "@sanity/client";

const sanityClient = client({
  projectId: "3zpk9otr",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25",
});

const urlBuilder = (ref) => urlBuild(sanityClient).image(ref);

const URL =
  'https://3zpk9otr.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "story"] | order(_createdAt desc) [0...52]';

/**
 * Fetches the stories from the backend. Returns the last 100 stories.
 * @returns {Promise<{images:string[], id:string, title:string, length:number, header:string, tag:string}[]>}
 */
async function fetchStories() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const res = data.result.map((story) => ({
      id: story._id,
      title: story.nom,
      tag: story.tag,
      length: story.images.length,
      header: urlBuilder(story.images[0].asset._ref)
        .width(1080)
        .height(1080)
        .url(),
      images: story.images.map((image) =>
        urlBuilder(image.asset._ref).width(1080).height(1080).url()
      ),
    }));
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetches the stories from the backend. Returns the last 100 stories.
 * @param {number} number The number of stories to fetch.
 * @returns {Promise<{images:string[], id:string, title:string, length:number, header:string, tag:string}[]>}
 */
async function fetchStoriesSlice(number) {
  const data = await fetchStories();
  return data.slice(0, number);
}

/**
 * Fetches a story from the backend.
 * @param {string} id The id of the story to fetch.
 * @returns {Promise<{images:string[], id:string, title:string, length:number, header:string, tag:string} | undefined>}
 */
async function fetchOneStory(id) {
  const data = await fetchStories();
  return data.find((story) => story.id === id);
}

export { fetchStories, fetchOneStory, fetchStoriesSlice };
