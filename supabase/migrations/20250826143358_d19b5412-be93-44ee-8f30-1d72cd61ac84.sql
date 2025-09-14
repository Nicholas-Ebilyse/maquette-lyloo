-- Update wellness content with appropriate thumbnail URLs
UPDATE wellness_content 
SET thumbnail_url = '/src/assets/meditation-breathing.jpg'
WHERE title = 'Méditation guidée - Respiration profonde';

UPDATE wellness_content 
SET thumbnail_url = '/src/assets/hypnosis-anxiety.jpg'
WHERE title = 'Auto-hypnose pour l''anxiété';

UPDATE wellness_content 
SET thumbnail_url = '/src/assets/sophrologie-stress.jpg'
WHERE title = 'Sophrologie anti-stress quotidien';

UPDATE wellness_content 
SET thumbnail_url = '/src/assets/breathing-exercise.jpg'
WHERE title = 'Respiration 4-7-8 pour l''endormissement';

UPDATE wellness_content 
SET thumbnail_url = '/src/assets/nature-sounds-forest.jpg'
WHERE title = 'Sons de la nature - Forêt paisible';

UPDATE wellness_content 
SET thumbnail_url = '/src/assets/sleep-hypnosis.jpg'
WHERE title = 'Hypnose pour le sommeil';

-- Update other meditation content with the meditation image
UPDATE wellness_content 
SET thumbnail_url = '/src/assets/meditation-breathing.jpg'
WHERE content_type = 'audio' AND (title LIKE '%méditation%' OR title LIKE '%Méditation%');

-- Update other hypnosis content with the hypnosis image
UPDATE wellness_content 
SET thumbnail_url = '/src/assets/hypnosis-anxiety.jpg'
WHERE title LIKE '%hypnose%' OR title LIKE '%Hypnose%';

-- Update other sophrologie content
UPDATE wellness_content 
SET thumbnail_url = '/src/assets/sophrologie-stress.jpg'
WHERE title LIKE '%sophrologie%' OR title LIKE '%Sophrologie%';

-- Update other breathing exercises
UPDATE wellness_content 
SET thumbnail_url = '/src/assets/breathing-exercise.jpg'
WHERE title LIKE '%respiration%' OR title LIKE '%Respiration%';

-- Update nature sounds content
UPDATE wellness_content 
SET thumbnail_url = '/src/assets/nature-sounds-forest.jpg'
WHERE title LIKE '%nature%' OR title LIKE '%forêt%' OR title LIKE '%océan%' OR title LIKE '%pluie%';

-- Update sleep-related content
UPDATE wellness_content 
SET thumbnail_url = '/src/assets/sleep-hypnosis.jpg'
WHERE title LIKE '%sommeil%' OR title LIKE '%endormissement%' OR title LIKE '%nuit%' OR title LIKE '%soir%';