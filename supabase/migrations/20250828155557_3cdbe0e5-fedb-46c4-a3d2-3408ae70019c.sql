-- Mettre à jour les URLs des médias wellness_content avec des contenus thématiques appropriés

-- Audio pour le sommeil
UPDATE wellness_content SET 
  audio_url = 'https://www.soundjay.com/misc/sounds/rain-01.mp3'
WHERE title = 'Pluie douce sur le toit';

UPDATE wellness_content SET 
  audio_url = 'https://www.soundjay.com/misc/sounds/rain-04.mp3'
WHERE title = 'Bruit blanc premium';

UPDATE wellness_content SET 
  audio_url = 'https://www.soundjay.com/misc/sounds/wind-chimes.mp3' 
WHERE title = 'Musique classique douce';

-- Vidéos pour le sommeil  
UPDATE wellness_content SET 
  video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
WHERE title = 'Contes pour adultes - Relaxation';

-- Vidéos pour le yoga du rire
UPDATE wellness_content SET 
  video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
WHERE title = 'Séance découverte du yoga du rire';

UPDATE wellness_content SET 
  video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
WHERE title = 'Yoga du rire matinal énergisant';

UPDATE wellness_content SET 
  video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
WHERE title = 'Rire thérapeutique anti-stress';

UPDATE wellness_content SET 
  video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
WHERE title = 'Yoga du rire en famille';

UPDATE wellness_content SET 
  video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4'
WHERE title = 'Yoga du rire pour la confiance';

UPDATE wellness_content SET 
  video_url = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
WHERE title = 'Méditation du rire';