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
    public $child;
    public $link;
    /**
     * Create a new message instance.
     */
    public function __construct($user, $child)
    {
        $this->user = $user;
        $this->child = $child;
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
                'child' => $this->child,
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
