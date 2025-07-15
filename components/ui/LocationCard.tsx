"use client";

import { Clock, Globe, MapPin } from "lucide-react";

const LocationCard = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 z-100">
      <div className="p-6">
        <h4 className="text-xl font-semibold text-white mb-6">
          Location & Availability
        </h4>
        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-center gap-3 text-gray-300">
            <MapPin className="w-5 h-5 text-blue-400" />
            <div>
              <div className="font-medium">Based in Riyadh, Saudi Arabia</div>
              <div className="text-sm text-gray-400">
                Available for remote work worldwide
              </div>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex items-center gap-3 text-gray-300">
            <Clock className="w-5 h-5 text-purple-400" />
            <div>
              <div className="font-medium">Timezone</div>
              <div className="text-sm text-gray-400">GMT+3 (Riyadh Time)</div>
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-3 text-gray-300">
            <Globe className="w-5 h-5 text-green-400" />
            <div>
              <div className="font-medium">Languages</div>
              <div className="text-sm text-gray-400">
                Arabic (Native) • English (Professional)
              </div>
            </div>
          </div>

          {/* Availability Status */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="text-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2 animate-pulse"></div>
              <div className="text-sm text-green-400 font-medium">
                Available for new projects
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
