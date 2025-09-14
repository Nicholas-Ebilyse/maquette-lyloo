-- Renforcement de la sécurité pour la table profiles
-- 1. Ajouter une politique explicite pour bloquer les accès anonymes
CREATE POLICY "Block anonymous access to profiles" 
ON public.profiles 
FOR ALL 
TO anon 
USING (false);

-- 2. Créer une fonction sécurisée pour vérifier l'ownership
CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT profile_user_id = auth.uid();
$$;

-- 3. Renforcer les politiques existantes avec la nouvelle fonction
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;

-- 4. Recréer les politiques avec des vérifications renforcées
CREATE POLICY "Users can view only their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (public.is_profile_owner(user_id));

CREATE POLICY "Users can update only their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (public.is_profile_owner(user_id))
WITH CHECK (public.is_profile_owner(user_id));

CREATE POLICY "Users can create only their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (public.is_profile_owner(user_id));

CREATE POLICY "Users can delete only their own profile" 
ON public.profiles 
FOR DELETE 
TO authenticated 
USING (public.is_profile_owner(user_id));

-- 5. Créer une vue publique pour masquer les données sensibles si nécessaire
CREATE OR REPLACE VIEW public.profiles_public AS
SELECT 
  id,
  first_name,
  username,
  created_at
FROM public.profiles
WHERE public.is_profile_owner(user_id);

-- 6. Ajouter des commentaires de sécurité
COMMENT ON TABLE public.profiles IS 'Table contenant les profils utilisateurs avec RLS strict - accès limité au propriétaire uniquement';
COMMENT ON FUNCTION public.is_profile_owner(uuid) IS 'Fonction de sécurité pour vérifier la propriété des profils - SECURITY DEFINER';