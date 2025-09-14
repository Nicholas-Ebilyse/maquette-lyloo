-- Add some demo audio content with actual downloadable URLs
INSERT INTO wellness_content (
  title, description, duration_minutes, content_type, difficulty_level, 
  audio_url, is_premium, tags, category_id
) VALUES 
(
  'Méditation guidée - Respiration profonde',
  'Une session de méditation de 5 minutes pour apprendre la respiration profonde et calmer l''esprit.',
  5,
  'audio',
  'Débutant',
  'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  false,
  ARRAY['méditation', 'respiration', 'débutant'],
  (SELECT id FROM categories WHERE name = 'Respiration' LIMIT 1)
),
(
  'Sons de la nature - Forêt paisible',
  'Ambiance sonore relaxante d''une forêt pour la détente et la méditation.',
  10,
  'audio', 
  'Débutant',
  'https://cdn.pixabay.com/download/audio/2021/08/09/audio_0625c1539c.mp3',
  false,
  ARRAY['nature', 'relaxation', 'ambiance'],
  (SELECT id FROM categories WHERE name = 'Respiration' LIMIT 1)  
),
(
  'Hypnose pour le sommeil',
  'Session d''hypnose douce pour favoriser l''endormissement et un sommeil réparateur.',
  20,
  'audio',
  'Intermédiaire', 
  'https://cdn.pixabay.com/download/audio/2022/03/10/audio_e2a49b6ca1.mp3',
  true,
  ARRAY['hypnose', 'sommeil', 'relaxation'],
  (SELECT id FROM categories WHERE name = 'Sommeil' LIMIT 1)
);