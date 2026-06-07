import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMovie, generateMovieDescription, getApiErrorMessage } from '@/api/movies';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { NewMovie } from '@/types/movie';

const emptyForm: NewMovie = {
  title: '',
  genre: '',
  description: '',
};

function validateForm(form: NewMovie): string | null {
  const title = form.title.trim();
  const genre = form.genre.trim();
  const description = form.description.trim();

  if (!title) {
    return 'Movie title is required (at least 1 character).';
  }
  if (title.length > 20) {
    return 'Movie title must be at most 20 characters.';
  }
  if (!genre) {
    return 'Genre is required (at least 1 character).';
  }
  if (!description) {
    return 'Description is required.';
  }
  if (description.length > 200) {
    return 'Description must be at most 200 characters.';
  }

  return null;
}

export function AddMoviePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<NewMovie>(emptyForm);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationError = validateForm(form);
    if (validationError) {
      alert(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await addMovie({
        title: form.title.trim(),
        genre: form.genre.trim(),
        description: form.description.trim(),
      });
      navigate('/all-movies');
    } catch (err) {
      setSubmitError(getApiErrorMessage(err, 'Failed to add movie. Try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGenerateDescription = async () => {
    const title = form.title.trim();
    const genre = form.genre.trim();

    if (!title || !genre) {
      alert('Enter title and genre before generating a description.');
      return;
    }

    setGenerating(true);
    setSubmitError(null);
    try {
      const result = await generateMovieDescription(title, genre);
      setForm((prev) => ({ ...prev, description: result.description.slice(0, 200) }));
    } catch (err) {
      alert(getApiErrorMessage(err, 'Failed to generate description with AI.'));
    } finally {
      setGenerating(false);
    }
  };

  const updateField = (field: keyof NewMovie, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Add Movie</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4"
        noValidate
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
            Movie Title
          </label>
          <Input
            id="title"
            type="text"
            maxLength={20}
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Movie name"
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-foreground mb-1">
            Genre
          </label>
          <Input
            id="genre"
            type="text"
            value={form.genre}
            onChange={(e) => updateField('genre', e.target.value)}
            placeholder="For example: Sci-Fi, Comedy"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
            Description
          </label>
          <Textarea
            id="description"
            maxLength={200}
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Short movie description"
          />
        </div>

        <Button type="button" variant="secondary" onClick={handleGenerateDescription} disabled={generating}>
          {generating ? 'Generating...' : 'Generate Description with AI'}
        </Button>

        {submitError && (
          <p className="text-destructive text-sm font-medium bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            {submitError}
          </p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add New Movie'}
        </Button>
      </form>
    </div>
  );
}
