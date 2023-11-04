import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Stories from 'react-insta-stories';
import './Browse.css';

function Browse() {
    const [stories, setStories] = useState([{content: null}]);
    const [showStories, setShowStories] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const dateParam = moment().format('DD_MM_YYYY');
            const response = await fetch(`https://api.mosakow.ski/api/stories?date=${dateParam}`);
            const data = await response.json();
            const models = data.urls.map((url) => {
                // Check if the url is a video
                const isVideoUrl = /\.(mp4|webm)(\?.*)?$/.test(url);

                // Construct story object conditionally
                const story = {
                    content: null,
                    url
                };
                if (isVideoUrl) {
                    story.type = 'video';
                }

                return story;
            })
            setStories(models);
        };

        fetchData().catch(console.error);
    }, []);

    // Function to handle the button click
    const startStories = () => {
        setShowStories(true);
    };
    const toggleSound = (isMuted) => {
        const mediaElements = document.querySelectorAll('video, audio');
        mediaElements.forEach((media) => {
            media.muted = isMuted;
        });
    }
    const toggleMute = () => {
        toggleSound(!isMuted)
        setIsMuted(!isMuted);
    };

    return (
        <div className="Browse">
            {!showStories && (
                <button onClick={startStories}>Start</button>
            )}
            {showStories && (
                <div className="media-player">
                    <button className="mute-button" onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
                    <Stories
                        stories={stories}
                        defaultInterval={1500}
                        width={432}
                        height={768}
                        onStoryStart={() => {
                            if (isMuted) toggleSound(isMuted)
                        }
                        }
                    />
                </div>

            )}
        </div>
    );
}

export default Browse
