const SERVER = "https://pacifiscan.org/stories/";

/**
 * Fetches the stories from the backend. Returns the last 100 stories.
 * @returns {Promise<{images:string[], id:string, title:string, length:number, headers:string, tags:string}[]>}
 */
async function fetchStories() {
  try {
    const response = await fetch(SERVER + "/api/list");
    const data = await response.json();
    return data;
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
