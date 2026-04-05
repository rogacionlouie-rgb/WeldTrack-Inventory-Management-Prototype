import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

export function Projects() {
  const { projects, addProject, updateProject, deleteProject, materials } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [viewProject, setViewProject] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'ongoing' as 'ongoing' | 'completed',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    materials: [] as { materialId: string; quantity: number; cost: number }[],
    laborCost: 0,
    miscCost: 0,
    totalCost: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalMaterialCost = formData.materials.reduce((sum, m) => sum + m.cost, 0);
    const totalCost = totalMaterialCost + formData.laborCost + formData.miscCost;

    if (editingId) {
      updateProject(editingId, { ...formData, totalCost });
    } else {
      addProject({ ...formData, totalCost });
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setFormData(project);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      status: 'ongoing',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      materials: [],
      laborCost: 0,
      miscCost: 0,
      totalCost: 0,
    });
  };

  const addMaterialToProject = () => {
    setFormData({
      ...formData,
      materials: [
        ...formData.materials,
        { materialId: '', quantity: 0, cost: 0 },
      ],
    });
  };

  const updateProjectMaterial = (index: number, field: string, value: any) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };

    if (field === 'materialId' || field === 'quantity') {
      const material = materials.find((m) => m.id === (field === 'materialId' ? value : updatedMaterials[index].materialId));
      if (material) {
        const quantity = field === 'quantity' ? value : updatedMaterials[index].quantity;
        updatedMaterials[index].cost = material.unitPrice * quantity;
      }
    }

    setFormData({ ...formData, materials: updatedMaterials });
  };

  const removeMaterialFromProject = (index: number) => {
    const updatedMaterials = formData.materials.filter((_, i) => i !== index);
    setFormData({ ...formData, materials: updatedMaterials });
  };

  const viewingProject = viewProject ? projects.find((p) => p.id === viewProject) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Project Management</h1>
          <p className="text-gray-600">Track and manage welding projects</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800">{project.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'ongoing'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {project.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>
                <span className="font-medium">Start Date:</span>{' '}
                {new Date(project.startDate).toLocaleDateString()}
              </p>
              {project.endDate && (
                <p>
                  <span className="font-medium">End Date:</span>{' '}
                  {new Date(project.endDate).toLocaleDateString()}
                </p>
              )}
              <p className="text-lg font-bold text-orange-600">
                Total Cost: ₱{project.totalCost.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t">
              <button
                onClick={() => setViewProject(project.id)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button
                onClick={() => handleEdit(project)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded hover:bg-orange-100"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-slate-800">
                {editingId ? 'Edit Project' : 'New Project'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'ongoing' | 'completed',
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Materials
                  </label>
                  <button
                    type="button"
                    onClick={addMaterialToProject}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    + Add Material
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.materials.map((material, index) => (
                    <div key={index} className="flex gap-2">
                      <select
                        value={material.materialId}
                        onChange={(e) =>
                          updateProjectMaterial(index, 'materialId', e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        <option value="">Select Material</option>
                        {materials.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name} - ₱{m.unitPrice}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={material.quantity}
                        onChange={(e) =>
                          updateProjectMaterial(index, 'quantity', Number(e.target.value))
                        }
                        placeholder="Qty"
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="number"
                        value={material.cost}
                        readOnly
                        placeholder="Cost"
                        className="w-28 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                      <button
                        type="button"
                        onClick={() => removeMaterialFromProject(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Labor Cost (₱)
                  </label>
                  <input
                    type="number"
                    value={formData.laborCost}
                    onChange={(e) =>
                      setFormData({ ...formData, laborCost: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Miscellaneous Cost (₱)
                  </label>
                  <input
                    type="number"
                    value={formData.miscCost}
                    onChange={(e) =>
                      setFormData({ ...formData, miscCost: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  {editingId ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-slate-800">
                {viewingProject.name}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
                <p className="text-gray-600">{viewingProject.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Status</h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      viewingProject.status === 'ongoing'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {viewingProject.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Start Date</h3>
                  <p className="text-gray-600">
                    {new Date(viewingProject.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Materials Used</h3>
                <div className="space-y-2">
                  {viewingProject.materials.map((m, index) => {
                    const material = materials.find((mat) => mat.id === m.materialId);
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded"
                      >
                        <span>{material?.name || 'Unknown'}</span>
                        <span className="text-sm text-gray-600">
                          {m.quantity} units - ₱{m.cost.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Labor Cost:</span>
                  <span className="font-medium">
                    ₱{viewingProject.laborCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Miscellaneous:</span>
                  <span className="font-medium">
                    ₱{viewingProject.miscCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold border-t pt-2">
                  <span>Total Cost:</span>
                  <span className="text-orange-600">
                    ₱{viewingProject.totalCost.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setViewProject(null)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
