-- Create enum for content types
CREATE TYPE public.content_type AS ENUM ('audio', 'video');

-- Create enum for difficulty levels
CREATE TYPE public.difficulty_level AS ENUM ('Débutant', 'Intermédiaire', 'Avancé');

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create wellness content table (for mental wellness content)
CREATE TABLE public.wellness_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  content_type content_type NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  difficulty_level difficulty_level NOT NULL,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  video_url TEXT,
  audio_url TEXT,
  thumbnail_url TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create meal plans table
CREATE TABLE public.meal_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  difficulty difficulty_level NOT NULL,
  image_url TEXT,
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create exercises table
CREATE TABLE public.exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  difficulty_level difficulty_level NOT NULL,
  exercise_type TEXT NOT NULL,
  video_url TEXT,
  thumbnail_url TEXT,
  instructions TEXT,
  equipment_needed TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recipes table
CREATE TABLE public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  prep_time_minutes INTEGER NOT NULL,
  calories INTEGER,
  ingredients JSONB,
  instructions TEXT,
  tags TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (content is public)
CREATE POLICY "Categories are publicly readable" 
ON public.categories FOR SELECT 
USING (true);

CREATE POLICY "Wellness content is publicly readable" 
ON public.wellness_content FOR SELECT 
USING (true);

CREATE POLICY "Meal plans are publicly readable" 
ON public.meal_plans FOR SELECT 
USING (true);

CREATE POLICY "Exercises are publicly readable" 
ON public.exercises FOR SELECT 
USING (true);

CREATE POLICY "Recipes are publicly readable" 
ON public.recipes FOR SELECT 
USING (true);

-- Create storage buckets for media files
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('wellness-videos', 'wellness-videos', true),
  ('wellness-audio', 'wellness-audio', true),
  ('wellness-images', 'wellness-images', true);

-- Create storage policies for public access to media
CREATE POLICY "Wellness videos are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'wellness-videos');

CREATE POLICY "Wellness audio is publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'wellness-audio');

CREATE POLICY "Wellness images are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'wellness-images');

-- Add update triggers for updated_at columns
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wellness_content_updated_at
  BEFORE UPDATE ON public.wellness_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_meal_plans_updated_at
  BEFORE UPDATE ON public.meal_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON public.exercises
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.categories (name, description, icon) VALUES
  ('Hypnose', 'Séances d''hypnose pour le développement personnel', 'Brain'),
  ('Sophrologie', 'Techniques de relaxation et de gestion du stress', 'Heart'),
  ('Respiration', 'Exercices de respiration et techniques de souffle', 'Wind'),
  ('Sommeil', 'Sons et méditations pour favoriser l''endormissement', 'Moon'),
  ('Yoga du rire', 'Séances énergisantes basées sur le rire thérapeutique', 'Smile'),
  ('Psycho-corporel', 'Reconnexion corps-esprit et ancrage', 'Zap');