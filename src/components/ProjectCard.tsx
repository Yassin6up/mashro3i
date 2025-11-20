'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, TrendingUp, CheckCircle, DollarSign, Eye, Shield } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };

  const seller = project.seller || {
    id: project.seller_id || '',
    name: project.seller_name || 'بائع',
    avatar: project.seller_picture || '/logo.png',
    rating: project.seller_rating || 0,
    totalSales: project.seller_total_sales || 0
  };

  const projectImage = project.images?.[0] || project.image || '/logo.png';

  return (
    <div className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-gray-100 hover:border-blue-100 relative overflow-hidden max-w-sm mx-auto">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Project Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <div className="aspect-video relative">
          <Image
            src={projectImage}
            alt={project.title}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Floating Action Button */}
        <Link
          href={`/projects/${project.id}`}
          className="absolute top-3 left-3 bg-[#7EE7FC] text-black p-2 rounded-full hover:bg-[#3bdeff] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Eye className="w-4 h-4" />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {project.verified && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
              <CheckCircle className="w-3 h-3" />
              موثق
            </span>
          )}
          {(project.profitable || project.is_profitable) && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
              <TrendingUp className="w-3 h-3" />
              مربح
            </span>
          )}
        </div>

        {/* Category Badge */}
        <span className="absolute bottom-3 right-3 bg-[#7EE7FC] text-black px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          {project.category}
        </span>
      </div>

      {/* Project Info */}
      <div className="space-y-4 relative z-10">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <Image
            src={seller.avatar}
            alt={seller.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
          />
          <div>
            <Link 
              href={`/profile/seller/${seller.id}`}
              className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 hover:text-blue-600 cursor-pointer"
            >
              {seller.name}
            </Link>
            <div className="flex items-center gap-2 text-xs mt-1">
              {seller.rating > 0 && (
                <>
                  <span className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-3xl">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-amber-700">{seller.rating}</span>
                  </span>
                  <span className="text-gray-400">•</span>
                </>
              )}
              {seller.totalSales > 0 && (
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-3xl">
                  <Shield className="w-3 h-3 text-blue-500" />
                  <span>{formatNumber(seller.totalSales)} مبيعات</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-3xl">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-amber-700">{project.rating} ({formatNumber(project.reviews)})</span>
          </span>
          {project.statistics && (
            <span className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-3xl">
              <Eye className="w-3 h-3 text-blue-500" />
              <span className="text-blue-700">{formatNumber(project.statistics.visitors)}</span>
            </span>
          )}
        </div>

        {/* Revenue Info */}
        {project.monthlyRevenue && (
          <div className="bg-cyan-50 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-3xl flex items-center justify-center shadow-sm">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold text-cyan-800">عائد شهري مضمون</span>
              <p className="text-cyan-700 font-bold">{formatPrice(project.monthlyRevenue)}/شهر</p>
            </div>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#7EE7FC] rounded-3xl flex items-center justify-center shadow-sm">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 group-hover:text-[#7EE7FC] transition-colors duration-300">
              {formatPrice(project.price)}
            </span>
          </div>
          <Link
            href={`/projects/${project.id}`}
            className="px-4 py-2 bg-[#7EE7FC] text-black text-sm font-semibold rounded-3xl hover:bg-[#7EE7FC] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            عرض التفاصيل
          </Link>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-3xl font-medium hover:bg-blue-100 hover:text-blue-700 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-3xl font-medium">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;