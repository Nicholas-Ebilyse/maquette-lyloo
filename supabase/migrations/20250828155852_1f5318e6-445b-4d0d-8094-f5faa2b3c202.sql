-- Activer la protection contre les mots de passe divulgués pour améliorer la sécurité
-- Cette mise à jour permettra de protéger contre l'utilisation de mots de passe compromis

-- Note: Cette configuration ne peut être définie que via l'interface Supabase Dashboard
-- Nous créons cette migration pour documenter le besoin, mais l'utilisateur devra l'activer manuellement

-- Ajouter un commentaire de documentation
COMMENT ON SCHEMA public IS 'Schema principal - protection mot de passe divulgué à activer via Dashboard';