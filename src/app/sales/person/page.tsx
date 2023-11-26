'use client'
import { useEffect, useState } from 'react';
import Api from '@/lib/axios';
import { Sales, SalesPerson } from '@/lib/type';
import Header from '@/components/header.components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Salespersons = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 

    if (!session) {
      router.replace('/login');
    }
  }, [session, status, router]);

  const [salespersons, setSalespersons] = useState<SalesPerson[]>([]);
  const [newSalesperson, setNewSalesperson] = useState({
    sales_person_id:0,
    sales_person_name: '',
    sales_person_phone: '',
    sales_person_address: '',
  });
  const [selectedSalesperson, setSelectedSalesperson] = useState<SalesPerson | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSalespersons();
  }, []);

  const fetchSalespersons = async () => {
    try {
      const response = await Api.getSalespersons();
      setSalespersons(response.data.data);
    } catch (error) {
      console.error('Error fetching salespersons:', error);
    }
  };

  const handleCreateSalesperson = async () => {
    try {
      await Api.createSalesperson(newSalesperson);
      clearForm();
      fetchSalespersons();
    } catch (error) {
      console.error('Error creating salesperson:', error);
    }
  };

  const handleEditSalesperson = (salesperson: SalesPerson) => {
    setSelectedSalesperson(salesperson);
    setIsEditing(true);
    setNewSalesperson({
        sales_person_id:salesperson.sales_person_id,
      sales_person_name: salesperson.sales_person_name,
      sales_person_phone: salesperson.sales_person_phone,
      sales_person_address: salesperson.sales_person_address,
    });
  };

  const handleUpdateSalesperson = async () => {
    try {
      if (selectedSalesperson) {
        await Api.updateSalesperson({
            sales_person_id: selectedSalesperson.sales_person_id,
            sales_person_name: newSalesperson.sales_person_name,
            sales_person_phone: newSalesperson.sales_person_phone,
            sales_person_address: newSalesperson.sales_person_address,
            sales: []
        });
        setIsEditing(false);
        clearForm();
        fetchSalespersons();
      }
    } catch (error) {
      console.error('Error updating salesperson:', error);
    }
  };

  const handleDeleteSalesperson = async (salespersonId: number) => {
    try {
      await Api.deleteSalesperson(salespersonId);
      fetchSalespersons();
    } catch (error) {
      console.error('Error deleting salesperson:', error);
    }
  };

  const handleViewDetails = async (salespersons: SalesPerson) => {
    try {
      setSelectedSalesperson(salespersons);
      setIsEditing(false);
    } catch (error) {
      console.error('Error fetching salesperson details:', error);
    }
  };

  const clearForm = () => {
    setNewSalesperson({
        sales_person_id:0,
      sales_person_name: '',
      sales_person_phone: '',
      sales_person_address: '',
    });
  };

  return (
    <div>
       <Header/>
      <h1>Salespersons Page</h1>
      <div>
        <h2>Create New Salesperson</h2>
        <input
          type="text"
          placeholder="Salesperson Name"
          value={newSalesperson.sales_person_name}
          onChange={(e) => setNewSalesperson({ ...newSalesperson, sales_person_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Salesperson Phone"
          value={newSalesperson.sales_person_phone}
          onChange={(e) => setNewSalesperson({ ...newSalesperson, sales_person_phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Salesperson Address"
          value={newSalesperson.sales_person_address}
          onChange={(e) => setNewSalesperson({ ...newSalesperson, sales_person_address: e.target.value })}
        />
        {isEditing ? (
          <>
            <button onClick={handleUpdateSalesperson}>Update Salesperson</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleCreateSalesperson}>Create Salesperson</button>
        )}
      </div>
      <div>
        <h2>Salesperson List</h2>
        <ul>
          {Array.isArray(salespersons) &&
            salespersons.map((salesperson) => (
              <li key={salesperson.sales_person_id}>
                {salesperson.sales_person_name} - {salesperson.sales_person_phone} - {salesperson.sales_person_address}
                <button onClick={() => handleDeleteSalesperson(salesperson.sales_person_id)}>Delete</button>
                <button onClick={() => handleViewDetails(salesperson)}>View Details</button>
                <button onClick={() => handleEditSalesperson(salesperson)}>Edit</button>
              </li>
            ))}
        </ul>
      </div>
      {selectedSalesperson && (
        <div>
          <h2>Salesperson Details</h2>
          <p>Name: {selectedSalesperson.sales_person_name}</p>
          <p>Phone: {selectedSalesperson.sales_person_phone}</p>
          <p>Address: {selectedSalesperson.sales_person_address}</p>
        </div>
      )}
    </div>
  );
};

export default Salespersons;
