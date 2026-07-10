'use client';

import React from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-border">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <IoChevronBack className="h-4 w-4 mr-1" />
        Previous
      </Button>

      <div className="flex items-center gap-1 px-4">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className="min-w-10"
            >
              {page}
            </Button>
          );
        })}
        {totalPages > 5 && (
          <>
            <span className="text-sm text-muted-foreground">...</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              className="min-w-10"
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
        <IoChevronForward className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}