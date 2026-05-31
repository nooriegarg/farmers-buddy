const MandiPriceForm = ({ form, setField, submitting, onCancel, isEdit }) => (
  <form className="space-y-3">
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Crop Name *</label>
        <input value={form.cropName} onChange={setField('cropName')} className="input-field" placeholder="e.g. Wheat" required />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Market Name *</label>
        <input value={form.marketName} onChange={setField('marketName')} className="input-field" placeholder="e.g. Azadpur Mandi" required />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
        <input value={form.state} onChange={setField('state')} className="input-field" placeholder="e.g. Punjab" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">District</label>
        <input value={form.district} onChange={setField('district')} className="input-field" placeholder="e.g. Amritsar" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Min ₹ *</label>
        <input type="number" step="0.01" min="0" value={form.minPrice} onChange={setField('minPrice')} className="input-field" required />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Max ₹ *</label>
        <input type="number" step="0.01" min="0" value={form.maxPrice} onChange={setField('maxPrice')} className="input-field" required />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Modal ₹ *</label>
        <input type="number" step="0.01" min="0" value={form.modalPrice} onChange={setField('modalPrice')} className="input-field" required />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Unit</label>
        <select value={form.unit} onChange={setField('unit')} className="input-field">
          <option value="Quintal">Quintal</option>
          <option value="Kg">Kg</option>
          <option value="Ton">Ton</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Price Date *</label>
        <input type="date" value={form.priceDate} onChange={setField('priceDate')} className="input-field" required />
      </div>
    </div>
    <div className="flex gap-3 justify-end pt-2">
      <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      <button type="submit" disabled={submitting} className="btn-primary">
        {submitting ? 'Saving...' : (isEdit ? 'Update' : 'Post Price')}
      </button>
    </div>
  </form>
);
export default MandiPriceForm;