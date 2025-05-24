<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EnrollmentConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $children;
    public $link;
    /**
     * Create a new message instance.
     */
    public function __construct($user, $children)
    {
        $this->user = $user;
        $this->children = $children;
        $this->link = config('app.frontend_url') . "/complete-registration/{$user->remember_token}";

    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Enrollment Confirmation Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'confirm-email',
            with: [
                'user' => $this->user,
                'children' => $this->children,
                'link' => $this->link,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
