import { FormatDate } from 'components';

export default function PostInfo({ className, author, date }) {
  if (!date && !author) {
    return null;
  }

  return (
    <div className={className}>
      {date && (
        <time dateTime={date}>
          <FormatDate date={date} />
        </time>
      )}
      {date && author && <>&nbsp;</>}
      {author && <span>By {author}</span>}
    </div>
  );
}
