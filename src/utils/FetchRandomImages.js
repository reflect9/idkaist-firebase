
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const fetchRandomImages = () => {
    const unsplash = createApi({
        accessKey: 'P4jcXQscMZRon9eX-0Kt5CdoruPB9_cpJOQNT07Zv7k',
        fetch: nodeFetch,
    });
    unsplash.photos.get(
        { photoId: '123' },
     // `fetch` options to be sent only with _this_ request
     { headers: { 'X-Custom-Header-2': 'bar' } },
    );
};

export default fetchRandomImages;
