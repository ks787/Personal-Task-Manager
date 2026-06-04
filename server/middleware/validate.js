/**
 * Validates the required title field.
 */
function validateTitle(req, res, next) {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (title.trim().length > 100) {
    return res.status(400).json({ error: 'Title must be 100 characters or fewer' });
  }

  next();
}

/**
 * Validates the optional description field when present.
 */
function validateDescription(req, res, next) {
  const { description } = req.body;

  if (description !== undefined && description.length > 1000) {
    return res.status(400).json({ error: 'Description must be 1000 characters or fewer' });
  }

  next();
}

/**
 * Validates the optional dueDate field when present.
 * Accepts YYYY-MM-DD strings only.
 */
function validateDueDate(req, res, next) {
  const { dueDate } = req.body;

  if (dueDate !== undefined && dueDate !== null && dueDate !== '') {
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    if (!iso.test(dueDate) || isNaN(Date.parse(dueDate))) {
      return res.status(400).json({ error: 'dueDate must be a valid YYYY-MM-DD date' });
    }
  }

  next();
}

module.exports = { validateTitle, validateDescription, validateDueDate };
// Improved validation
