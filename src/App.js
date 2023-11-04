import './App.css';
import React, {useState, useEffect} from 'react';
import moment from 'moment';

function App() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dateParam = moment().format('DD_MM_YYYY');
            const response = await fetch(`/api/stories?date=${dateParam}`);
            const data = await response.json();
            setStories(data.urls);
        };

        fetchData().catch(console.error);
    }, []);

    // A helper function to determine if a URL is for a video
    const isVideo = (url) => {
        return /\.(mp4|webm)(\?.*)?$/.test(url);
    };

    return (
        <div>
            {stories.map((url) => (
                <div key={url}>
                    {isVideo(url) ? (
                        <video controls src={url}/>
                    ) : (
                        <img src={url} alt={`Story ${url}`}/>
                    )}
                </div>
            ))}
        </div>
    );
}

export default App;
