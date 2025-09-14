-- Insérer 10 contenus pour chaque catégorie de bien-être mental

-- Récupérer les IDs des catégories
DO $$
DECLARE
    hypnose_id UUID;
    sophro_id UUID;
    respiration_id UUID;
    sommeil_id UUID;
    yoga_rire_id UUID;
    psycho_id UUID;
BEGIN
    -- Récupérer les IDs des catégories
    SELECT id INTO hypnose_id FROM public.categories WHERE name = 'Hypnose';
    SELECT id INTO sophro_id FROM public.categories WHERE name = 'Sophrologie';
    SELECT id INTO respiration_id FROM public.categories WHERE name = 'Respiration';
    SELECT id INTO sommeil_id FROM public.categories WHERE name = 'Sommeil';
    SELECT id INTO yoga_rire_id FROM public.categories WHERE name = 'Yoga du rire';
    SELECT id INTO psycho_id FROM public.categories WHERE name = 'Psycho-corporel';

    -- HYPNOSE (10 contenus)
    INSERT INTO public.wellness_content (title, description, duration_minutes, content_type, category_id, difficulty_level, is_premium, rating, tags) VALUES
    ('Séance d''hypnose pour la confiance en soi', 'Renforcez votre estime personnelle grâce à cette séance d''hypnose douce et progressive. Idéal pour surmonter les doutes et développer une confiance authentique.', 25, 'audio', hypnose_id, 'Débutant', false, 4.8, ARRAY['confiance', 'estime de soi', 'développement personnel']),
    ('Hypnose anti-stress profond', 'Libérez-vous du stress accumulé avec cette séance d''hypnose thérapeutique. Techniques avancées de relaxation et de lâcher-prise pour un apaisement durable.', 35, 'video', hypnose_id, 'Intermédiaire', true, 4.9, ARRAY['stress', 'relaxation', 'thérapie']),
    ('Hypnose pour arrêter de fumer', 'Programme complet d''hypnose pour vous libérer définitivement du tabac. Reprogrammation mentale et renforcement de votre motivation à arrêter.', 45, 'audio', hypnose_id, 'Avancé', true, 4.7, ARRAY['tabac', 'addiction', 'sevrage']),
    ('Auto-hypnose pour l''anxiété', 'Apprenez les techniques d''auto-hypnose pour gérer votre anxiété au quotidien. Outils pratiques et exercices guidés pour retrouver votre sérénité.', 20, 'video', hypnose_id, 'Débutant', false, 4.6, ARRAY['anxiété', 'auto-hypnose', 'gestion émotionnelle']),
    ('Hypnose régressive thérapeutique', 'Explorez votre passé pour guérir le présent. Séance d''hypnose régressive pour comprendre et résoudre les blocages inconscients.', 60, 'audio', hypnose_id, 'Avancé', true, 4.8, ARRAY['régression', 'thérapie', 'guérison']),
    ('Hypnose pour la motivation', 'Boostez votre motivation et atteignez vos objectifs grâce à la puissance de l''hypnose. Programmation mentale positive et dynamisation de l''énergie.', 30, 'video', hypnose_id, 'Intermédiaire', false, 4.5, ARRAY['motivation', 'objectifs', 'réussite']),
    ('Hypnose pour les phobies', 'Surmontez vos peurs irrationnelles avec cette séance spécialisée. Désensibilisation progressive et reconstruction des réponses émotionnelles.', 40, 'audio', hypnose_id, 'Avancé', true, 4.9, ARRAY['phobies', 'peurs', 'désensibilisation']),
    ('Hypnose créative et intuition', 'Développez votre créativité et votre intuition grâce à l''hypnose. Accédez à vos ressources créatives profondes et stimulez l''inspiration.', 25, 'video', hypnose_id, 'Intermédiaire', false, 4.4, ARRAY['créativité', 'intuition', 'inspiration']),
    ('Hypnose pour la douleur chronique', 'Gérez naturellement la douleur chronique avec l''hypnose thérapeutique. Techniques de contrôle mental et de soulagement durable.', 35, 'audio', hypnose_id, 'Avancé', true, 4.7, ARRAY['douleur', 'chronique', 'soulagement']),
    ('Hypnose de détente express', 'Relaxation rapide et efficace pour les moments de tension. Parfait pour une pause détente au bureau ou entre deux activités stressantes.', 15, 'video', hypnose_id, 'Débutant', false, 4.3, ARRAY['détente', 'express', 'pause']);

    -- SOPHROLOGIE (10 contenus)
    INSERT INTO public.wellness_content (title, description, duration_minutes, content_type, category_id, difficulty_level, is_premium, rating, tags) VALUES
    ('Sophrologie anti-stress quotidien', 'Exercices de sophrologie pour gérer le stress du quotidien. Techniques de respiration, relaxation musculaire et visualisation positive.', 20, 'audio', sophro_id, 'Débutant', false, 4.6, ARRAY['stress', 'quotidien', 'relaxation']),
    ('Sophrologie pour l''examen', 'Préparez-vous mentalement aux examens et concours. Gestion du trac, amélioration de la concentration et optimisation des performances.', 30, 'video', sophro_id, 'Intermédiaire', false, 4.8, ARRAY['examens', 'concentration', 'performance']),
    ('Sophrologie et gestion émotionnelle', 'Apprenez à accueillir et réguler vos émotions grâce aux outils sophrologiques. Développement de l''intelligence émotionnelle.', 25, 'audio', sophro_id, 'Intermédiaire', true, 4.7, ARRAY['émotions', 'régulation', 'intelligence émotionnelle']),
    ('Sophrologie pour la confiance', 'Renforcez votre assurance personnelle et professionnelle. Exercices pratiques pour développer une confiance authentique et durable.', 35, 'video', sophro_id, 'Débutant', false, 4.5, ARRAY['confiance', 'assurance', 'développement']),
    ('Sophrologie prénatale', 'Accompagnement sophrologique pour les futures mamans. Préparation à l''accouchement, gestion du stress et connexion avec bébé.', 40, 'audio', sophro_id, 'Débutant', true, 4.9, ARRAY['grossesse', 'accouchement', 'maternité']),
    ('Sophrologie du sportif', 'Optimisez vos performances sportives grâce à la sophrologie. Préparation mentale, gestion de la pression et récupération optimisée.', 28, 'video', sophro_id, 'Avancé', false, 4.6, ARRAY['sport', 'performance', 'préparation mentale']),
    ('Sophrologie et sommeil réparateur', 'Retrouvez un sommeil de qualité avec la sophrologie. Exercices de détente profonde et programmation d''un sommeil naturel.', 32, 'audio', sophro_id, 'Intermédiaire', true, 4.8, ARRAY['sommeil', 'récupération', 'repos']),
    ('Sophrologie en entreprise', 'Gérez le stress professionnel et améliorez votre bien-être au travail. Techniques adaptées à l''environnement professionnel.', 22, 'video', sophro_id, 'Débutant', false, 4.4, ARRAY['travail', 'entreprise', 'stress professionnel']),
    ('Sophrologie et douleur', 'Accompagnement sophrologique pour la gestion de la douleur. Techniques de dissociation et de contrôle mental de la souffrance.', 38, 'audio', sophro_id, 'Avancé', true, 4.7, ARRAY['douleur', 'gestion', 'soulagement']),
    ('Sophrologie énergétique', 'Rechargez vos batteries et retrouvez votre vitalité. Exercices dynamiques et visualisations énergisantes pour un regain d''énergie.', 18, 'video', sophro_id, 'Intermédiaire', false, 4.3, ARRAY['énergie', 'vitalité', 'dynamisme']);

    -- RESPIRATION (10 contenus)
    INSERT INTO public.wellness_content (title, description, duration_minutes, content_type, category_id, difficulty_level, is_premium, rating, tags) VALUES
    ('Respiration 4-7-8 pour l''endormissement', 'Technique de respiration ancestrale pour faciliter l''endormissement. Méthode simple et efficace pour calmer le système nerveux.', 10, 'audio', respiration_id, 'Débutant', false, 4.9, ARRAY['sommeil', 'endormissement', 'calme']),
    ('Respiration de cohérence cardiaque', 'Équilibrez votre système nerveux avec la cohérence cardiaque. 5 minutes de respiration guidée pour réduire stress et anxiété.', 5, 'video', respiration_id, 'Débutant', false, 4.8, ARRAY['cohérence cardiaque', 'équilibre', 'stress']),
    ('Pranayama - Respiration yogique', 'Découvrez les techniques de respiration du yoga. Pranayamas traditionnels pour purifier le corps et apaiser l''esprit.', 25, 'audio', respiration_id, 'Intermédiaire', true, 4.7, ARRAY['yoga', 'pranayama', 'purification']),
    ('Respiration Wim Hof method', 'Méthode de respiration révolutionnaire pour booster l''immunité et l''énergie. Technique de respiration contrôlée et rétention.', 20, 'video', respiration_id, 'Avancé', true, 4.6, ARRAY['immunité', 'énergie', 'résistance']),
    ('Respiration anti-anxiété', 'Calmez instantanément l''anxiété avec ces techniques respiratoires spécialisées. Outils d''urgence pour retrouver votre sérénité.', 12, 'audio', respiration_id, 'Débutant', false, 4.8, ARRAY['anxiété', 'urgence', 'calme']),
    ('Respiration énergisante matinale', 'Réveillez votre corps et votre esprit avec cette séquence respiratoire dynamique. Parfait pour commencer la journée avec vitalité.', 15, 'video', respiration_id, 'Intermédiaire', false, 4.5, ARRAY['matin', 'énergie', 'réveil']),
    ('Respiration de la méditation zen', 'Respirations contemplatives pour approfondir votre méditation. Techniques traditionnelles zen pour cultiver la présence.', 30, 'audio', respiration_id, 'Avancé', true, 4.9, ARRAY['méditation', 'zen', 'présence']),
    ('Respiration pour la concentration', 'Améliorez votre focus et votre attention grâce à des exercices respiratoires ciblés. Parfait avant le travail ou les études.', 8, 'video', respiration_id, 'Débutant', false, 4.4, ARRAY['concentration', 'focus', 'attention']),
    ('Respiration thérapeutique', 'Libérez les tensions émotionnelles stockées dans le corps avec la respiration thérapeutique. Accompagnement en douceur.', 35, 'audio', respiration_id, 'Avancé', true, 4.8, ARRAY['thérapie', 'émotions', 'libération']),
    ('Respiration box breathing', 'Technique de respiration carrée utilisée par les forces spéciales. Parfaite pour gérer le stress intense et retrouver le contrôle.', 10, 'video', respiration_id, 'Intermédiaire', false, 4.6, ARRAY['contrôle', 'stress intense', 'military']);

    -- SOMMEIL (10 contenus)
    INSERT INTO public.wellness_content (title, description, duration_minutes, content_type, category_id, difficulty_level, is_premium, rating, tags) VALUES
    ('Sons de la nature - Forêt tropicale', 'Plongez dans l''ambiance apaisante d''une forêt tropicale. Chants d''oiseaux, bruissement des feuilles et ruissellement de l''eau.', 60, 'audio', sommeil_id, 'Débutant', false, 4.7, ARRAY['nature', 'forêt', 'oiseaux']),
    ('Pluie douce sur le toit', 'Laissez-vous bercer par le son apaisant de la pluie qui tombe doucement. Parfait pour un endormissement naturel et profond.', 45, 'audio', sommeil_id, 'Débutant', false, 4.8, ARRAY['pluie', 'apaisant', 'cocooning']),
    ('Méditation du sommeil guidée', 'Voyage intérieur vers un sommeil réparateur. Relaxation progressive et visualisations pour un endormissement en douceur.', 25, 'video', sommeil_id, 'Débutant', true, 4.9, ARRAY['méditation', 'guidée', 'voyage intérieur']),
    ('Bruit blanc premium', 'Son neutre et constant pour masquer les bruits parasites. Idéal pour les environnements bruyants ou les esprits agités.', 120, 'audio', sommeil_id, 'Débutant', false, 4.5, ARRAY['bruit blanc', 'masquage', 'concentration']),
    ('Fréquences binaurales sommeil', 'Ondes sonores spécifiques pour induire les phases de sommeil profond. Technologie audio avancée pour optimiser votre repos.', 90, 'audio', sommeil_id, 'Avancé', true, 4.8, ARRAY['binaurales', 'ondes', 'sommeil profond']),
    ('Contes pour adultes - Relaxation', 'Histoires apaisantes spécialement conçues pour endormir les adultes. Narrateur professionnel et ambiances sonores immersives.', 30, 'video', sommeil_id, 'Débutant', true, 4.6, ARRAY['contes', 'histoires', 'narrateur']),
    ('Sons de l''océan - Vagues', 'Rhythm hypnotique des vagues sur la plage. Transport instantané vers un rivage paisible pour un sommeil océanique.', 75, 'audio', sommeil_id, 'Débutant', false, 4.7, ARRAY['océan', 'vagues', 'plage']),
    ('Yoga nidra du soir', 'Relaxation yogique profonde pour préparer le corps et l''esprit au sommeil. Conscience sans effort et lâcher-prise total.', 40, 'video', sommeil_id, 'Intermédiaire', true, 4.8, ARRAY['yoga nidra', 'relaxation', 'conscience']),
    ('Musique classique douce', 'Sélection de pièces classiques apaisantes pour accompagner votre endormissement. Compositeurs spécialement choisis pour leurs vertus relaxantes.', 55, 'audio', sommeil_id, 'Débutant', false, 4.4, ARRAY['classique', 'musique', 'culture']),
    ('ASMR pour le sommeil', 'Déclencheurs ASMR doux et répétitifs pour induire une relaxation profonde. Chuchotements et sons tactiles apaisants.', 35, 'video', sommeil_id, 'Débutant', true, 4.5, ARRAY['asmr', 'chuchotements', 'déclencheurs']);

    -- YOGA DU RIRE (10 contenus)
    INSERT INTO public.wellness_content (title, description, duration_minutes, content_type, category_id, difficulty_level, is_premium, rating, tags) VALUES
    ('Séance découverte du yoga du rire', 'Introduction joyeuse au yoga du rire. Exercices simples et libérateurs pour découvrir les bienfaits du rire thérapeutique.', 20, 'video', yoga_rire_id, 'Débutant', false, 4.6, ARRAY['découverte', 'introduction', 'libération']),
    ('Yoga du rire matinal énergisant', 'Commencez votre journée avec le sourire ! Routine matinale de yoga du rire pour booster votre énergie et votre bonne humeur.', 15, 'video', yoga_rire_id, 'Débutant', false, 4.7, ARRAY['matin', 'énergie', 'bonne humeur']),
    ('Rire thérapeutique anti-stress', 'Libérez vos tensions avec le pouvoir guérisseur du rire. Séance intensive pour évacuer le stress et retrouver la légèreté.', 25, 'video', yoga_rire_id, 'Intermédiaire', true, 4.8, ARRAY['thérapeutique', 'guérison', 'légèreté']),
    ('Yoga du rire en famille', 'Partagez des moments de joie pure en famille. Exercices adaptés à tous les âges pour créer du lien et de la complicité.', 18, 'video', yoga_rire_id, 'Débutant', false, 4.5, ARRAY['famille', 'partage', 'complicité']),
    ('Rire et respiration consciente', 'Combinez les bienfaits du rire et de la respiration consciente. Oxygénation optimale et libération des endorphines naturelles.', 22, 'video', yoga_rire_id, 'Intermédiaire', false, 4.6, ARRAY['respiration', 'endorphines', 'oxygénation']),
    ('Yoga du rire pour la confiance', 'Développez votre assurance grâce au rire libérateur. Exercices spécifiques pour surmonter la timidité et rayonner de joie.', 28, 'video', yoga_rire_id, 'Intermédiaire', true, 4.7, ARRAY['confiance', 'timidité', 'rayonnement']),
    ('Méditation du rire', 'Fusion unique entre méditation et rire spontané. Accédez à un état de béatitude naturelle et de paix intérieure joyeuse.', 30, 'video', yoga_rire_id, 'Avancé', true, 4.9, ARRAY['méditation', 'béatitude', 'paix intérieure']),
    ('Rire corporel et mouvement', 'Libérez votre corps par le rire et le mouvement spontané. Danse libre et expression corporelle joyeuse sans jugement.', 24, 'video', yoga_rire_id, 'Intermédiaire', false, 4.4, ARRAY['corporel', 'mouvement', 'expression']),
    ('Yoga du rire thérapeutique', 'Séance thérapeutique approfondie pour traiter la dépression légère et l''anxiété. Accompagnement professionnel et bienveillant.', 35, 'video', yoga_rire_id, 'Avancé', true, 4.8, ARRAY['thérapie', 'dépression', 'accompagnement']),
    ('Rire social et connexion', 'Créez du lien social authentique grâce au rire partagé. Perfect pour les groupes et les événements communautaires.', 20, 'video', yoga_rire_id, 'Débutant', false, 4.3, ARRAY['social', 'lien', 'communauté']);

    -- PSYCHO-CORPOREL (10 contenus)
    INSERT INTO public.wellness_content (title, description, duration_minutes, content_type, category_id, difficulty_level, is_premium, rating, tags) VALUES
    ('Reconnexion corps-esprit', 'Rétablissez le dialogue entre votre corps et votre esprit. Exercices de conscience corporelle et d''écoute intérieure profonde.', 30, 'audio', psycho_id, 'Intermédiaire', false, 4.7, ARRAY['reconnexion', 'conscience', 'écoute']),
    ('Ancrage et enracinement', 'Développez votre ancrage terrestre et votre stabilité émotionnelle. Visualisations et exercices pour vous sentir solidement enraciné.', 25, 'video', psycho_id, 'Débutant', false, 4.6, ARRAY['ancrage', 'stabilité', 'enracinement']),
    ('Libération des tensions corporelles', 'Identifiez et relâchez les tensions physiques liées aux émotions. Approche holistique du bien-être corps-esprit.', 35, 'audio', psycho_id, 'Intermédiaire', true, 4.8, ARRAY['tensions', 'libération', 'holistique']),
    ('Circulation énergétique', 'Harmonisez la circulation de l''énergie vitale dans votre corps. Techniques inspirées de la médecine traditionnelle chinoise.', 28, 'video', psycho_id, 'Avancé', true, 4.5, ARRAY['énergie', 'circulation', 'médecine chinoise']),
    ('Mémoire cellulaire et guérison', 'Accédez aux mémoires stockées dans vos cellules pour une guérison profonde. Travail subtil sur l''inconscient corporel.', 40, 'audio', psycho_id, 'Avancé', true, 4.9, ARRAY['mémoire cellulaire', 'guérison', 'inconscient']),
    ('Conscience proprioceptive', 'Développez votre sensibilité proprioceptive et votre relation à l''espace. Exercices pour affiner votre perception corporelle.', 22, 'video', psycho_id, 'Intermédiaire', false, 4.4, ARRAY['proprioception', 'perception', 'espace']),
    ('Respiration et émotion', 'Explorez le lien intime entre respiration et état émotionnel. Techniques pour moduler vos émotions par la respiration.', 20, 'audio', psycho_id, 'Débutant', false, 4.6, ARRAY['respiration', 'émotion', 'modulation']),
    ('Mouvement authentique', 'Laissez votre corps s''exprimer librement par le mouvement spontané. Danse thérapeutique et expression corporelle authentique.', 32, 'video', psycho_id, 'Intermédiaire', true, 4.7, ARRAY['mouvement', 'authenticité', 'expression']),
    ('Integration psycho-corporelle', 'Intégrez les apprentissages de votre thérapie dans votre corps. Séance de consolidation et d''ancrage des transformations.', 38, 'audio', psycho_id, 'Avancé', true, 4.8, ARRAY['intégration', 'thérapie', 'transformation']),
    ('Centrage et présence', 'Trouvez votre centre de gravité physique et émotionnel. Exercices pour cultiver la présence à soi et la stabilité intérieure.', 26, 'video', psycho_id, 'Débutant', false, 4.5, ARRAY['centrage', 'présence', 'stabilité']);

END $$;