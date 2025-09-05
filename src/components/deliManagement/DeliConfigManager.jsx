import React, { useEffect, useState } from "react";
import { createDeliveryConfig } from "./../../types/delivery";
import { DeliveryConfigForm } from "./DeliConfigForm";
import { DeliveryConfigCard } from "./DeliConfigCard";
import { Plus, Search, Filter } from "lucide-react";
import getAllDeliverZone from "../../api/deliveryApi/getAllDeliZone";

export const DeliveryConfigManager = () => {
  const [configs, setConfigs] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterReachable, setFilterReachable] = useState(null);

  const getDeliverZone = async () => {
    try {
      const response = await getAllDeliverZone();
      console.log(response);
      if (response.status === "success") {
        setConfigs(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeliverZone();
  }, []);

  const handleAddConfig = (newConfig) => {
    const configWithId = {
      ...newConfig,
      // id: Date.now().toString(),
    };
    setConfigs((prev) => [...prev, configWithId]);
    setShowForm(false);
  };

  const handleUpdateConfig = (updatedConfig) => {
    setConfigs((prev) =>
      prev.map((config) =>
        config.id === editingConfig?.id
          ? { ...updatedConfig, id: config.id }
          : config
      )
    );
    setEditingConfig(null);
  };

  const handleEditConfig = (config) => {
    setEditingConfig(config);
    setShowForm(false);
  };

  const handleDeleteConfig = (id) => {
    if (window.confirm("Are you sure you want to delete this configuration?")) {
      setConfigs((prev) => prev.filter((config) => config.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingConfig(null);
  };

  const filteredConfigs = configs.filter((config) => {
    const matchesSearch =
      config.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.township.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterReachable === null || config.reachable === filterReachable;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="px-4">
      <div className="overflow-y-auto h-[calc(100vh-50px)]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-2">
          <div className="">
            <h1 className="header ml-8 lg:ml-0">Delivery Configuration</h1>
            <p className="text-gray-600">
              Manage delivery pricing for different locations
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative  md:w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by city or township..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg font-medium focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingConfig(null);
              }}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Configuration
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row items-center justify-end gap-4 mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Filter */}
            {/* <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={
                  filterReachable === null ? "" : filterReachable.toString()
                }
                onChange={(e) =>
                  setFilterReachable(
                    e.target.value === "" ? null : e.target.value === "true"
                  )
                }
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg font-medium focus:outline-none bg-white"
              >
                <option value="">All Status</option>
                <option value="true">Reachable</option>
                <option value="false">Not Reachable</option>
              </select>
            </div> */}
          </div>
        </div>

        {/* Form */}
        {(showForm || editingConfig) && (
          <div className="mb-8">
            <DeliveryConfigForm
              onSubmit={editingConfig ? handleUpdateConfig : handleAddConfig}
              onCancel={
                editingConfig ? handleCancelEdit : () => setShowForm(false)
              }
              initialData={editingConfig || undefined}
              isEditing={!!editingConfig}
              refetch={getDeliverZone}
            />
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredConfigs.length}</span> of{" "}
            <span className="font-semibold">{configs.length}</span>{" "}
            configurations
          </p>
        </div>

        {/* Config Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConfigs.map((config) => (
            <DeliveryConfigCard
              key={config.id}
              config={config}
              onEdit={handleEditConfig}
              onDelete={handleDeleteConfig}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredConfigs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No configurations found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterReachable !== null
                ? "Try adjusting your search or filter criteria"
                : "Create your first delivery configuration to get started"}
            </p>
            {!showForm && !editingConfig && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Configuration
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
