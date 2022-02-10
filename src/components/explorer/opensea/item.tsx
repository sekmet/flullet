import Link from 'next/link';

export default function Item({asset}) {
  return (
    <div className="group relative">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
            src={asset.image_preview_url}
            alt={asset.description}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
        </div>
        <div className="mt-4 flex justify-between">
        <div>
            <h3 className="text-sm text-gray-700">
            <a href={'true'} target="_blank">
                <span aria-hidden="true" className="absolute inset-0" />
                {asset.name}
            </a>
            </h3>
            <a href={asset.external_link ? asset.external_link : asset.permalink} target="_blank">
            <p className="mt-1 text-sm text-gray-500" style={{backgroundColor: `#${asset.background_color}`}}>{asset.background_color}</p>
            </a>
        </div>
        <p className="text-sm font-medium text-gray-900">{asset.top_bid}</p>
        </div>
    </div>
  )

}