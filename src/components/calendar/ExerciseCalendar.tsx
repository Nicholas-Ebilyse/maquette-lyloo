import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Activity,
  Plus,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Exercise {
  id: string;
  title: string;
  duration: string;
  level: string;
  type: string;
}

interface ScheduledExercise extends Exercise {
  date: Date;
  time: string;
}

interface ExerciseCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  exercises: Exercise[];
}

const ExerciseCalendar = ({ isOpen, onClose, exercises }: ExerciseCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [scheduledExercises, setScheduledExercises] = useState<ScheduledExercise[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedTime, setSelectedTime] = useState("09:00");

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const getExercisesForDate = (date: Date) => {
    return scheduledExercises.filter(exercise => 
      exercise.date.toDateString() === date.toDateString()
    );
  };

  const addExerciseToDate = () => {
    if (selectedDate && selectedExercise) {
      const newScheduledExercise: ScheduledExercise = {
        ...selectedExercise,
        date: selectedDate,
        time: selectedTime
      };
      setScheduledExercises([...scheduledExercises, newScheduledExercise]);
      setShowAddDialog(false);
      setSelectedExercise(null);
    }
  };

  const removeExercise = (exerciseId: string, date: Date) => {
    setScheduledExercises(scheduledExercises.filter(
      exercise => !(exercise.id === exerciseId && exercise.date.toDateString() === date.toDateString())
    ));
  };

  const getDatesWithExercises = () => {
    return scheduledExercises.map(exercise => exercise.date);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Planificateur d'exercices
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full overflow-hidden">
            {/* Calendrier */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Calendrier</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  modifiers={{
                    hasExercise: getDatesWithExercises()
                  }}
                  modifiersStyles={{
                    hasExercise: { 
                      backgroundColor: 'hsl(var(--primary))', 
                      color: 'white',
                      fontWeight: 'bold'
                    }
                  }}
                />
                
                {selectedDate && (
                  <div className="mt-4 w-full">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">
                        {selectedDate.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </h4>
                      <Button
                        size="sm"
                        onClick={() => setShowAddDialog(true)}
                        className="btn-sage"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Ajouter
                      </Button>
                    </div>
                    
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {getExercisesForDate(selectedDate).map((exercise, index) => (
                        <div
                          key={`${exercise.id}-${index}`}
                          className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm font-medium">{exercise.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {exercise.title}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExercise(exercise.id, selectedDate)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      
                      {getExercisesForDate(selectedDate).length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Aucun exercice planifié pour cette date
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Liste des exercices disponibles */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Exercices disponibles</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-3">
                  {exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className={cn(
                        "p-3 border rounded-lg cursor-pointer transition-colors",
                        selectedExercise?.id === exercise.id 
                          ? "border-primary bg-primary/10" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1">{exercise.title}</h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {exercise.duration}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {exercise.level}
                            </Badge>
                          </div>
                        </div>
                        <Activity className="h-4 w-4 text-primary mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog d'ajout d'exercice */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Planifier un exercice</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Date sélectionnée
              </label>
              <p className="text-sm text-muted-foreground">
                {selectedDate?.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Exercice
              </label>
              <p className="text-sm text-muted-foreground">
                {selectedExercise?.title || "Aucun exercice sélectionné"}
              </p>
            </div>
            
            <div>
              <label htmlFor="time" className="text-sm font-medium mb-2 block">
                Heure
              </label>
              <input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border border-border rounded-md"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddDialog(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={addExerciseToDate}
                disabled={!selectedExercise}
                className="flex-1"
              >
                Planifier
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExerciseCalendar;