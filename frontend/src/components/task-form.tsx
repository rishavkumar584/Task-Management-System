"use client";

import { useState } from "react";

type TaskFormProps = {
  onSubmit: (values: { title: string; description: string }) => Promise<void>;
  initialValues?: {
    title: string;
    description: string;
  };
  submitLabel?: string;
};

export default function TaskForm({
  onSubmit,
  initialValues,
  submitLabel = "Add Task",
}: TaskFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
      });

      if (!initialValues) {
        setTitle("");
        setDescription("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-4 shadow-md">
      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 outline-none"
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 outline-none"
          placeholder="Enter task description"
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}