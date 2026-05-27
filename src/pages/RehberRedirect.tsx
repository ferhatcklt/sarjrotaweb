import { Navigate, useParams } from 'react-router-dom';

/** Eski /rehber/:slug URL'lerini /blog/:slug'a yönlendirir */
export default function RehberRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/blog/${slug}`} replace />;
}
