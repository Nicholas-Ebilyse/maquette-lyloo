-- Enable INSERT, UPDATE, DELETE on wellness_content table for admin operations
CREATE POLICY "Admins can insert wellness content" 
ON public.wellness_content 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update wellness content" 
ON public.wellness_content 
FOR UPDATE 
USING (true);

CREATE POLICY "Admins can delete wellness content" 
ON public.wellness_content 
FOR DELETE 
USING (true);

-- Enable INSERT, UPDATE, DELETE on other content tables for future admin operations
CREATE POLICY "Admins can insert exercises" 
ON public.exercises 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update exercises" 
ON public.exercises 
FOR UPDATE 
USING (true);

CREATE POLICY "Admins can delete exercises" 
ON public.exercises 
FOR DELETE 
USING (true);

CREATE POLICY "Admins can insert meal plans" 
ON public.meal_plans 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update meal plans" 
ON public.meal_plans 
FOR UPDATE 
USING (true);

CREATE POLICY "Admins can delete meal plans" 
ON public.meal_plans 
FOR DELETE 
USING (true);

CREATE POLICY "Admins can insert recipes" 
ON public.recipes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update recipes" 
ON public.recipes 
FOR UPDATE 
USING (true);

CREATE POLICY "Admins can delete recipes" 
ON public.recipes 
FOR DELETE 
USING (true);