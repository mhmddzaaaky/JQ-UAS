
        const music = document.getElementById('bg-music');
        const toggleBtn = document.getElementById('music-toggle');
        const icon = document.getElementById('music-icon');

        function setPlayingState(isPlaying) {
            icon.textContent = isPlaying ? '♪' : '♫';
            toggleBtn.classList.toggle('is-playing', isPlaying);
        }

            music.play()
            .then(() => setPlayingState(true))
            .catch(() => {
                setPlayingState(false);

                const startOnFirstInteraction = () => {
                    music.play().then(() => setPlayingState(true));
                    document.removeEventListener('click', startOnFirstInteraction);
                };
                document.addEventListener('click', startOnFirstInteraction);
            });

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (music.paused) {
                music.play();
                setPlayingState(true);
            } else {
                music.pause();
                setPlayingState(false);
            }
        });

        
        const videos = document.querySelectorAll('#video video');
        let musicWasPlayingBeforeVideo = false;

        videos.forEach((video) => {
            video.addEventListener('play', () => {
                
                videos.forEach((v) => {
                    if (v !== video) v.pause();
                });

                if (!music.paused) {
                    musicWasPlayingBeforeVideo = true;
                    music.pause();
                    setPlayingState(false);
                }
            });

            const resumeMusic = () => {
                if (musicWasPlayingBeforeVideo) {
                    music.play();
                    setPlayingState(true);
                    musicWasPlayingBeforeVideo = false;
                }
            };

            video.addEventListener('pause', resumeMusic);
            video.addEventListener('ended', resumeMusic);
        });
