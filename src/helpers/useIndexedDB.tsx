import { useCallback, useEffect, useState } from 'react';
import { Employee } from '../components/employees/Employees.hooks';
import { toast } from 'react-toastify';

export interface User {
	id: string;
	name: string;
	email: string;
}

export enum Stores {
	Employees = 'Employees',
	Database = 'EmployeeDatabase',
}

export const useIndexedDB = () => {
	const [db, setDB] = useState<IDBDatabase | null>(null);
	const version = 1;
	const storeName = Stores.Employees;
	const database = Stores.Database;

	const initialiseIndexedDB = useCallback(() => {
		// open the connection
		const request = indexedDB.open(database, version);
		request.onsuccess = () => {
			const database = request.result;
			setDB(database);
		};

		request.onupgradeneeded = (event: any) => {
			const database = event.target?.result;

			// Create an object store (table) for your data
			if (!database.objectStoreNames.contains(storeName)) {
				const objectStore = database.createObjectStore(storeName, {
					keyPath: 'id',
					autoIncrement: true,
				});

				// Create an index for searching by text
				objectStore.createIndex('text', 'text', { unique: false });
			}
		};

		request.onerror = () => {
			console.error('Error opening IndexedDB');
		};
	}, []);

	useEffect(() => {
		initialiseIndexedDB();
	}, [initialiseIndexedDB]);

	const addEmployee = (data: Employee) => {
		if (!db) return;

		const transaction = db.transaction(storeName, 'readwrite');
		const objectStore = transaction.objectStore(storeName);

		const request = objectStore.add(data);

		request.onsuccess = () => {
			toast.success('Employee added successfully');
		};

		request.onerror = () => {
			toast.error('Error adding employee');
		};
	};

	const getEmployees = (callback: (employees: Employee[]) => void) => {
		if (!db) {
			callback([]);
			return;
		}

		const transaction = db.transaction(storeName, 'readonly');
		const objectStore = transaction.objectStore(storeName);

		const request = objectStore.getAll();

		request.onsuccess = () => {
			const employees = request.result as Employee[];
			callback(employees);
		};

		request.onerror = () => {
			toast.error('Error fetching employees');
		};
	};

	const updateEmployee = (key: number, updatedEmployee: Employee) => {
		if (!db) return;

		const transaction = db.transaction(storeName, 'readwrite');
		const objectStore = transaction.objectStore(storeName);
		const request = objectStore.put(updatedEmployee, key);
		request.onsuccess = () => {
			toast.success('Employee updated successfully');
		};

		request.onerror = () => {
			toast.error('Error updating employee');
		};
	};

	const deleteEmployee = (key: number) => {
		if (!db) return;
		const transaction = db.transaction(storeName, 'readwrite');
		const objectStore = transaction.objectStore(storeName);

		const request = objectStore.delete(key);

		request.onsuccess = () => {
			toast.success('Employee deleted successfully');
		};

		request.onerror = () => {
			toast.error('Error deleting employee');
		};
	};

	return {
		addEmployee,
		updateEmployee,
		deleteEmployee,
		getEmployees,
	};
};
