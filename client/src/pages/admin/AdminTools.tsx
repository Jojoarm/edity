import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Title from '@/components/common/Title';
import ActionToolCard from '@/components/common/cards/ActionToolCard';
import { adminActionTools } from '@/assets/assets';

const AdminTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tools = adminActionTools;

  const categories = [
    { id: 'all', name: 'All Tools', count: tools.length },
    {
      id: 'academic',
      name: 'Academic',
      count: tools.filter((t) => t.category === 'academic').length,
    },
    {
      id: 'calendar',
      name: 'Calendar',
      count: tools.filter((t) => t.category === 'calendar').length,
    },
    {
      id: 'management',
      name: 'Management',
      count: tools.filter((t) => t.category === 'management').length,
    },
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-3">
      <Title
        title="Admin Tools"
        subtitle="Manage your educational platform with these powerful administrative
            tools"
        align="left"
      />
      <div className="p-5 mb-10 bg-white border rounded-2xl">
        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <ActionToolCard
                key={tool.id}
                borderColor={tool.borderColor}
                lightColor={tool.lightColor}
                color={tool.color}
                title={tool.title}
                description={tool.description}
                features={tool.features}
                IconComponent={IconComponent}
                path={tool.path}
                // onSubmit={() => handleToolClick(tool.path)}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tools found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filter criteria
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(1).map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="text-2xl font-bold text-gray-900">
                {category.count}
              </div>
              <div className="text-sm text-gray-600">{category.name} Tools</div>
            </div>
          ))}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {tools.length}
            </div>
            <div className="text-sm text-gray-600">Total Tools</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTools;
