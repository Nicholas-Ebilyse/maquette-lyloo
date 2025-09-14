-- Correction urgente des problèmes de sécurité détectés

-- 1. Supprimer la vue problématique SECURITY DEFINER
DROP VIEW IF EXISTS public.profiles_public;

-- 2. Corriger la fonction avec un search_path sécurisé  
CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT profile_user_id = auth.uid();
$$;

-- 3. Créer une vue standard (sans SECURITY DEFINER) pour les données publiques si nécessaire
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  first_name,
  username,
  created_at
FROM public.profiles;

-- Appliquer RLS à la vue aussi
ALTER VIEW public.public_profiles SET (security_invoker = true);

-- 4. Ajouter des commentaires de sécurité mis à jour
COMMENT ON FUNCTION public.is_profile_owner(uuid) IS 'Fonction de sécurité pour vérifier la propriété des profils - search_path sécurisé';
COMMENT ON VIEW public.public_profiles IS 'Vue publique des profils avec RLS standard (pas de SECURITY DEFINER)';