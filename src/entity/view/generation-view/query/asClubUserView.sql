SELECT club.club_name AS club_name, 
club.club_id AS club_id,
application.result AS result,
user.name AS user_name,
user.gcn AS gcn,
user.user_id AS user_id
FROM club 
LEFT JOIN application ON club.club_id = application.club_id 
LEFT JOIN user ON application.user_id = user.user_id;