'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

import Heading from '../components/Heading';
import Modal from '../components/modals/Modal';
import Container from '../components/Container';
import ListingGrid from '../components/listings/ListingGrid';
import ListingCard from '../components/listings/ListingCard';

/* Constants */
import { API_ROUTES } from '../components/common/constants';

/* Types */
import type { Listing, User } from '@prisma/client';

/* Hooks */
import useDeletePropertyModal from '@/hooks/useDeletePropertyModal';

type MyPropertiesClientProps = {
  myProperties: Listing[];
  currentUser?: User | null;
};

/**
 * TODO: Ideally, a property should not be deleted if it has
 * reservations in place. Making the owner to cancel any reservation
 * then allowing them to remove delete it.
 */
export default function MyPropertiesClient({ myProperties, currentUser }: MyPropertiesClientProps) {
  const router = useRouter();
  const confirmModal = useDeletePropertyModal();

  const [deletingId, setDeletingId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Open the confirm modal setting the intended id for cancelation
  const handleDeletePropertyClick = useCallback(
    (id: string) => {
      setDeletingId(id);
      confirmModal.onOpen();
    },
    [confirmModal]
  );

  const onDeleteProperty = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios
        .delete(`${API_ROUTES.LISTINGS}/${id}`)
        .then(() => {
          toast.success('Property deleted!');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
          setIsLoading(false);
          confirmModal.onClose();
        });
    },
    [router, confirmModal]
  );

  const confirmModalBody = (
    <Heading
      title="Are you sure you want to delete this property?"
      subtitle="IMPORTANT: Reservations made to this property will be inmediatelly canceled."
    />
  );

  return (
    <Container>
      <Heading title="My Properties" subtitle="These are your properties." />
      <ListingGrid sectionId="properties-listings">
        {myProperties.map((property) => (
          <ListingCard
            key={property.id}
            data={property}
            currentUser={currentUser}
            actionLabel="Delete"
            onAction={() => handleDeletePropertyClick(property.id)}
          />
        ))}
        {/* Confirm Modal */}
        <Modal
          isOpen={confirmModal.isOpen}
          title="Delete property"
          body={confirmModalBody}
          actionLabel="Confirm"
          isLoading={isLoading}
          disabled={isLoading}
          disabledSecondary={isLoading}
          onConfirm={() => onDeleteProperty(deletingId)}
          secondaryAction={confirmModal.onClose}
          onClose={confirmModal.onClose}
        />
      </ListingGrid>
    </Container>
  );
}
