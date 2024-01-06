const fetchFeedApi = async (page) => {
    try {
    const data =  await fetch(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`);
    const feedJson = await data?.json();
    return feedJson?.nodes
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  export { fetchFeedApi };