-- Add demo data for exercises
INSERT INTO exercises (
  title, description, instructions, duration_minutes, exercise_type, 
  difficulty_level, equipment_needed, thumbnail_url
) VALUES 
(
  'Yoga du matin - Salutation au soleil',
  'Une séquence de yoga douce pour commencer la journée en douceur et réveiller le corps.',
  'Commencez debout, les pieds écartés à la largeur des hanches. Inspirez en levant les bras au ciel, expirez en vous penchant vers l''avant. Placez les mains au sol, sautez ou reculez en planche, descendez en chaturanga, remontez en chien tête en haut, puis poussez en chien tête en bas. Respirez 5 fois puis revenez debout.',
  15,
  'Yoga',
  'Débutant',
  ARRAY['Tapis de yoga'],
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
),
(
  'HIIT cardio intense',
  'Entraînement cardiovasculaire haute intensité pour brûler un maximum de calories.',
  '4 rounds de 4 minutes : 20 secondes d''effort intense, 10 secondes de repos. Exercices : burpees, mountain climbers, jumping jacks, squats jump. Récupération de 1 minute entre chaque round.',
  20,
  'Cardio',
  'Avancé',
  ARRAY['Aucun équipement'],
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
),
(
  'Renforcement musculaire complet',
  'Circuit training pour renforcer tous les groupes musculaires majeurs.',
  '3 séries de chaque exercice : 15 pompes, 20 squats, 30 secondes de planche, 15 fentes par jambe, 20 dips sur chaise. Repos de 1 minute entre chaque série.',
  25,
  'Musculation',
  'Intermédiaire',
  ARRAY['Chaise', 'Tapis'],
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
);

-- Add demo data for meal plans
INSERT INTO meal_plans (
  title, description, instructions, duration_days, difficulty, image_url
) VALUES 
(
  'Détox 7 jours',
  'Programme alimentaire de 7 jours pour purifier l''organisme et retrouver de l''énergie.',
  'Jour 1-2: Smoothies verts et soupes de légumes. Jour 3-4: Ajout de salades composées. Jour 5-7: Réintroduction progressive des protéines maigres. Boire 2L d''eau par jour minimum.',
  7,
  'Débutant',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
),
(
  'Plan prise de masse 30 jours',
  'Programme nutritionnel pour la prise de masse musculaire sur 30 jours.',
  'Apport calorique augmenté de 300-500 calories. 5-6 repas par jour. Accent sur les protéines (2g/kg de poids corporel), glucides complexes et bonnes graisses. Supplémentation en protéines recommandée post-entraînement.',
  30,
  'Avancé',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
),
(
  'Équilibre méditerranéen 14 jours',
  'Découverte de la cuisine méditerranéenne pour une alimentation saine et savoureuse.',
  'Privilégier les légumes, fruits, céréales complètes, légumineuses, poissons et huile d''olive. Limiter la viande rouge et les produits transformés. 1 verre de vin rouge autorisé au dîner.',
  14,
  'Intermédiaire',
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
);

-- Add demo data for recipes
INSERT INTO recipes (
  title, description, instructions, prep_time_minutes, calories, 
  ingredients, tags, image_url
) VALUES 
(
  'Bowl Buddha aux légumes grillés',
  'Un bol coloré et nutritif avec des légumes de saison grillés et une sauce tahini.',
  '1. Préchauffer le four à 200°C. 2. Couper les légumes en morceaux et les disposer sur une plaque. 3. Arroser d''huile d''olive, saler, poivrer. 4. Griller 25 min. 5. Préparer la sauce en mélangeant tahini, citron, ail et eau. 6. Servir sur lit de quinoa avec la sauce.',
  35,
  450,
  '{"quinoa": "150g", "courgettes": "2", "poivrons": "2", "brocolis": "200g", "tahini": "2 cuillères à soupe", "citron": "1", "ail": "1 gousse", "huile olive": "3 cuillères à soupe"}',
  ARRAY['végétarien', 'sans gluten', 'healthy'],
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
),
(
  'Smoothie protéiné post-workout',
  'Smoothie riche en protéines parfait après l''entraînement pour la récupération musculaire.',
  '1. Mettre tous les ingrédients dans un blender. 2. Mixer jusqu''à obtenir une texture lisse. 3. Ajouter des glaçons si désiré. 4. Servir immédiatement.',
  5,
  320,
  '{"banane": "1", "protéine whey vanille": "30g", "lait d''amande": "250ml", "épinards": "50g", "beurre d''amande": "1 cuillère à soupe", "miel": "1 cuillère à café"}',
  ARRAY['protéiné', 'post-workout', 'smoothie'],
  'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
),
(
  'Salade de quinoa aux super-aliments',
  'Salade complète riche en nutriments avec quinoa, avocat et graines.',
  '1. Cuire le quinoa selon les instructions du paquet. 2. Laisser refroidir. 3. Couper l''avocat, les tomates cerises. 4. Préparer la vinaigrette avec huile, citron, moutarde. 5. Mélanger tous les ingrédients. 6. Parsemer de graines et feta.',
  20,
  380,
  '{"quinoa": "100g", "avocat": "1", "tomates cerises": "200g", "concombre": "1", "feta": "100g", "graines de tournesol": "2 cuillères à soupe", "huile olive": "3 cuillères à soupe", "citron": "1/2"}',
  ARRAY['végétarien', 'super-aliments', 'salade'],
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
);