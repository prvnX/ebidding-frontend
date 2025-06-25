import { Link } from 'react-router-dom';

export default ({breadCrumbs, page}) => (
    <div className="flex items-center text-sm text-gray-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {breadCrumbs && breadCrumbs.map((crumb, index) => (
            <span key={index}>
                <Link to={crumb.link} className="hover:text-blue-600">{crumb.title}</Link>
                <span className="mx-2">/</span>
            </span>
        ))}
        <span className="font-medium text-gray-900">{page}</span>
    </div>
)